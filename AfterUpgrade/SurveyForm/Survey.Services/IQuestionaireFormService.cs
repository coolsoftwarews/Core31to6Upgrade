using Microsoft.EntityFrameworkCore;
using Survey.Core.Domain.Questionaire;
using Survey.Core.ResourceParameters;
using Survey.Data;
using Survey.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Survey.Services
{
    public interface IQuestionaireFormService
    {
        Task<List<string>> GetNames(string searchText);
        Task<dtoQuestionaireForm> NewForm();
        Task<dtoQuestionaireForm> SaveForm(dtoQuestionaireForm questionaireForm);
        Task<List<dtoQuestionaireForm>> GetAll(QuestionaireResourceParameters questionaireResourceParameters);
    }

    public class QuestionaireFormService : IQuestionaireFormService
    {
        private IRepository<MainForm> _mainFormRepository;
        private IRepository<Question> _questionRepository;
        private IRepository<Answer> _answerRepository;
        private IRepository<Venue> _venueRepository;

        public QuestionaireFormService(
                                IRepository<MainForm> mainFormRepository,
                                IRepository<Question> questionRepository,
                                IRepository<Answer> answerRepository,
                                IRepository<Venue> venueRepository
            )
        {
            this._mainFormRepository = mainFormRepository;
            this._questionRepository = questionRepository;
            this._answerRepository = answerRepository;
            this._venueRepository = venueRepository;
        }

        public async Task<List<string>> GetNames(string searchText)
        {
            var result = await this._mainFormRepository.FindAll()
                                        .Where(x=>x.FullName.Contains(searchText))
                                        .OrderBy(x=>x.FullName)
                                        .Select(x=>x.FullName)
                                        .Distinct()
                                        .ToListAsync();

            return result;
        }

        public async Task<List<dtoQuestionaireForm>> GetAll(QuestionaireResourceParameters questionaireResourceParameters)
        {
            try
            {
                if (questionaireResourceParameters == null)
                {
                    throw new ArgumentNullException(nameof(questionaireResourceParameters));
                }

                var query = this._mainFormRepository.FindAll();

                if (!string.IsNullOrWhiteSpace(questionaireResourceParameters.SearchQuery))
                {
                    string search = questionaireResourceParameters.SearchQuery;

                    query = query.Where(x => x.FullName.Contains(search));
                }

                var mainForms = await query
                                       .Include(a=>a.Answers).ThenInclude(x=>x.Question)
                                       .OrderByDescending(x=>x.DateCreated)
                                       .Take(1000)
                                       .ToListAsync();

                List<dtoQuestionaireForm> result = new List<dtoQuestionaireForm>();
                foreach (var mainForm in mainForms)
                {
                    result.Add(ConvertUserToQuestionForm(mainForm));
                }

                return result.OrderByDescending(x=>x.DateCreated).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<dtoQuestionaireForm> NewForm()
        {
            try
            {
                var questions = await this._questionRepository.FindByCondition(q => q.IsActive == true).ToListAsync();
                var venues = await this._venueRepository.FindAll().ToListAsync();

                var newForm = new dtoQuestionaireForm();
                newForm.DateCreated = DateTime.Now;

                foreach (var question in questions)
                {
                    var qa = new dtoQuestionAndAnswer()
                    {
                        QuestionId = question.Id,
                        Question = question.Name,
                        IsTrue = true
                    };

                    newForm.QuestionsAndAnswers.Add(qa);
                }

                foreach (var venue in venues)
                {
                    var item = new dtoVenues()
                    {
                        Id = venue.Id,
                        Name = venue.Name
                    };

                    newForm.VenueLookupList.Add(item);
                }

                return newForm;

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<dtoQuestionaireForm> SaveForm(dtoQuestionaireForm questionaireForm)
        {
            dtoQuestionaireForm result = new dtoQuestionaireForm();

            try
            {
                MainForm mainForm = new MainForm();
                mainForm.FirstName = questionaireForm.FirstName;
                mainForm.LastName = questionaireForm.LastName;
                mainForm.FullName = $"{questionaireForm.FirstName} {questionaireForm.LastName}";
                mainForm.Email = questionaireForm.Email;
                mainForm.DateCreated = DateTime.Now;
                mainForm.VenueId = questionaireForm.VenueId;
                mainForm.ResourceId = Guid.NewGuid();

                List<Answer> answers = new List<Answer>();
                foreach (var qa in questionaireForm.QuestionsAndAnswers)
                {
                    var answer = new Answer()
                    {
                        QuestionId = qa.QuestionId,
                        IsTrue = qa.IsTrue,
                        DateCreated = DateTime.Now
                    };

                    answers.Add(answer);
                }

                mainForm.Answers = answers;

                await this._mainFormRepository.CreateAsync(mainForm);
               
                result.IsCompliant = questionaireForm.QuestionsAndAnswers.Where(x => x.IsTrue == true).Count() < 2;

            }
            catch (Exception ex)
            {
                //log error.
                
            }

            return result;
        }


        private dtoQuestionaireForm ConvertUserToQuestionForm(MainForm mainForm)
        {
            dtoQuestionaireForm item = new dtoQuestionaireForm();
            item.FirstName = mainForm.FirstName;
            item.LastName = mainForm.LastName;
            item.Email = mainForm.Email;
            item.FullName = mainForm.FullName;
            item.IsCompliant = mainForm.Answers.Where(a => a.IsTrue == true).Count() < 2;
            item.DateCreated = mainForm.DateCreated.AddHours(2);
            item.ResourceId = mainForm.ResourceId;

            foreach (var answer in mainForm.Answers)
            {
                var qa = new dtoQuestionAndAnswer()
                {
                    QuestionId = answer.QuestionId,
                    Question = answer.Question.Name,
                    IsTrue = answer.IsTrue
                };

                item.QuestionsAndAnswers.Add(qa);
            }

            return item;
        }
    }
}
