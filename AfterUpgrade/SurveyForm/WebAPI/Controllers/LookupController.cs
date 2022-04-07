using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private IQuestionaireFormService _questionaireFormService;

        public LookupController(
                        IQuestionaireFormService questionaireFormService
            //   ILoggerManager loggerManager
            )
        {
            this._questionaireFormService = questionaireFormService;
        }
        [HttpGet(Name = "GetNames")]
        public async Task<IActionResult> GetNames([FromQuery] string searchText)
        {
            try
            {
                var result = await this._questionaireFormService.GetNames(searchText);
                return Ok(result);
            }
            catch (Exception ex)
            {
                //_logger.LogError($"Something went wrong inside GetById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
