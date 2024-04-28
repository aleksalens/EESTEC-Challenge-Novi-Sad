using iTextSharp.text.pdf.parser;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json;

namespace MichTeachBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportMaterialController : Controller
    {

        private readonly HttpClient _httpClient;

        public ImportMaterialController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            //_httpClient.BaseAddress = new Uri("https://6af9-34-73-126-108.ngrok-free.app");
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

            var response = await _httpClient.PostAsync("https://208b-34-73-126-108.ngrok-free.app/jquestions", JsonContent.Create(new ResponseHelloWorld () { response = pageS}));

            return await response.Content.ReadFromJsonAsync<ResponseHelloWorld>();

        }

        public class ResponseHelloWorld
        {
            public string response { get; set; }
        }
    }
}
