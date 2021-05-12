using System.Security.Claims;
using System.Threading.Tasks;
using API.Services;
using Application.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [AllowAnonymous]
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _signInManager = signInManager;
      _userManager = userManager;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
      var user = await _userManager.Users
        .Include(u => u.Photo)
        .FirstOrDefaultAsync(u => u.Email == loginDTO.Login || u.UserName == loginDTO.Login);

      if (user == null)
        return (Unauthorized("Неправильная почта"));
      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

      if (result.Succeeded)
        return (ConvertEntityToUser(user));
      return (Unauthorized("Неправильный пароль"));
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
      var user = await _userManager.Users
        .Include(u => u.Photo)
        .FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));
      
      if (user != null)
        return (ConvertEntityToUser(user));
      return (Unauthorized());
    }

    private UserDTO ConvertEntityToUser(User user)
    {
      if (user == null)
        return (null);
      return (new UserDTO
      {
        Image = user?.Photo?.Url,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      });
    }
  }
}