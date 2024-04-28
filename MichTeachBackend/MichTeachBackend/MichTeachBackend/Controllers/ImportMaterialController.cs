using System.Text;
using iTextSharp.text.pdf.parser;
using MichTeachBackend.Data;
using MichTeachBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MichTeachBackend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ImportMaterialController : Controller
	{
		private readonly ApplicationDbContext _context;
		private readonly HttpClient _httpClient;

		public ImportMaterialController(HttpClient httpClient, ApplicationDbContext context)
		{
			_httpClient = httpClient;
			_context = context;
			//_httpClient.BaseAddress = new Uri("https://6af9-34-73-126-108.ngrok-free.app");
		}

		[HttpPost("/PostPDF/{id}/{name}")]
		public async Task<IActionResult> PostPDF(int id, string name)
		{
			iTextSharp.text.pdf.PdfReader reader = new iTextSharp.text.pdf.PdfReader("C:/Users/Nemanja/Desktop/arthritis.pdf");
			var page = PdfTextExtractor.GetTextFromPage(reader, 2);

			var response = await _httpClient.PostAsync("https://a709-34-125-74-81.ngrok-free.app/questions", JsonContent.Create(new ResponseHelloWorld() { response = page }));
			var datareturned = await response.Content.ReadFromJsonAsync<ResponseHelloWorld>();
			var returnedval = datareturned.response;
			//var fulluser = _context.Users.Include(u => u.Courses).ThenInclude(c => c.Questions).Where(u => u.Id == id).FirstOrDefault();
			//var qust = fulluser.Courses.Where(c => c.Name.Equals(name)).FirstOrDefault();
			//var qst = qust.Questions.Select(c => c.Title).FirstOrDefault();
			int lastIndex = returnedval.LastIndexOf('?');
			string wantedText = returnedval.Substring(0, lastIndex + 1);

			string pdfcontent = wantedText.Replace("?", "?;");
			//var pdfContent = "1.Kako se zovu osnovni delovi ćelije biljaka i životinja?;2.Koje su osnovne funkcije korena biljaka?;3.Koja je razlika između sisavaca i ptica u pogledu načina ishrane?;4.Kako se razlikuju biljke od životinja po načinu disanja?;5.Koje su osnovne razlike između biljaka koje se razmnožavaju semenom i biljaka koje se razmnožavaju sporama?;6.Koji su delovi biljke odgovorni za fotosintezu i disanje?;7.Kako se razlikuju vretenasti crvi od zglavkara?;8.Koje su osnovne karakteristike kišnih šuma?;9.Koja je uloga bakterija u prirodi i u ljudskom telu?;10.Kako se razlikuju klijetke od bakterija po veličini i obliku?";
			var questionarray = pdfcontent.Split(";");
			Course course = new Course()
			{
				Name = name,
				UserId = id,
			};

			_context.Add(course);
			_context.SaveChanges();

			var courseid = _context.Courses.Where(c => c.Name == name).Select(c => c.Id).FirstOrDefault();
			List<Question> questionList = new List<Question>();
			foreach (var question in questionarray)
			{
				Question q = new Question()
				{
					Title = question.Trim(),
					CourseId = courseid,
				};
				questionList.Add(q);

			}

			_context.AddRange(questionList);
			_context.SaveChanges();

			return Ok();
		}


		[HttpGet]
		public async Task<ResponseHelloWorld> Get()
		{
			iTextSharp.text.pdf.PdfReader reader = new iTextSharp.text.pdf.PdfReader("C:\\Users\\Dell\\Desktop\\NSHakaton\\pdfcitanje\\Zadaci.pdf");
			iTextSharp.text.pdf.PdfReader reader1 = new iTextSharp.text.pdf.PdfReader("C:\\Users\\Dell\\Downloads\\Resume Stefan Neskovic.pdf");

			var sb = new StringBuilder();
			sb.Append(reader.ToString());
			var str = reader.ToString();
			var page = PdfTextExtractor.GetTextFromPage(reader, 1);
			var pageS = PdfTextExtractor.GetTextFromPage(reader1, 1);
			var nemanja = "nemanja sabac punto grande";

			var jsonText = JsonConvert.SerializeObject(new { text = pageS });

			// Send POST request to FastAPI endpoint
			//var response = await _httpClient.GetAsync("https://eee6-34-73-126-108.ngrok-free.app/questions?string_param=" + pageS);

			var response = await _httpClient.PostAsync("https://fe04-34-125-74-81.ngrok-free.app/", JsonContent.Create(new ResponseHelloWorld() { response = pageS }));




			var datareturned = await response.Content.ReadFromJsonAsync<ResponseHelloWorld>();
			var returnedval = datareturned.response;

			var staticString = "1. What is your favorite color?;2. Do you prefer cats or dogs?;3. What is your dream vacation destination?;4. Are you a morning person or a night owl?;5. What is your favorite season?;6. Do you enjoy reading books?;7. What is your favorite type of music?;8. Do you prefer coffee or tea?;9. What is your favorite hobby?;10. What is your favorite movie genre?";

			var questionarray = staticString.Split(";");

			Course course = new Course()
			{
				Name = "Predmet",
				UserId = 1,
			};

			_context.Add(course);

			foreach (var question in questionarray)
			{
				Question q = new Question()
				{
					Title = question,
				};
			}

			return datareturned;

		}

		[HttpGet("/GetInfo/{id}")]
		public IActionResult GetInfo(int id)
		{
			var userHistory = _context.Users.Include(u => u.Courses).ThenInclude(c => c.Questions).Where(u => u.Id.Equals(id)).FirstOrDefault();

			var courseInfo = userHistory.Courses.Select(course => new
			{
				CourseName = course.Name,
				QuestionCount = course.Questions.Count
			}).ToList();

			return Ok(courseInfo);

		}

		[HttpGet("/GetQuestions/{id}/{name}")]
		public IActionResult GetQuestions(int id, string name)
		{

			var questionsList = _context.Courses.Where(c => c.Name.Equals(name) && c.UserId.Equals(id)).Select(c => c.Questions).ToList();
			var questions = questionsList.Select(q => q.Select(x => x.Title)).ToList();
			return Ok(questions);
		}

		public class ResponseHelloWorld
		{
			public string response { get; set; }
		}
	}
}
