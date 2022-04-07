using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Core.ResourceParameters;
using Survey.Services;
using Survey.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WebAPI.Controllers
{
    [Route("api/questionaire")]
    [ApiController]
    public class QuestionairesController : ControllerBase
    {
        private IQuestionaireFormService _questionaireFormService;

        public QuestionairesController(
                        IQuestionaireFormService questionaireFormService
                     //   ILoggerManager loggerManager
            )
        {
            this._questionaireFormService = questionaireFormService;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<IActionResult> Get([FromQuery] QuestionaireResourceParameters questionaireResourceParameters )
        {
            try
            {
                var result = await this._questionaireFormService.GetAll(questionaireResourceParameters);
                return Ok(result);
            }
            catch (Exception ex)
            {
               //_logger.LogError($"Something went wrong inside GetById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name = "GetNewForm")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                //if zero, get new form
                var result = await this._questionaireFormService.NewForm();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(dtoQuestionaireForm questionaireForm)
        {
            try
            {
               var result =  await this._questionaireFormService.SaveForm(questionaireForm);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
