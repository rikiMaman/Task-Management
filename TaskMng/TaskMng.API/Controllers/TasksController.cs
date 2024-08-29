using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskMng.Core.Models;
using TaskMng.Core.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskMng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {

        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public async Task<ActionResult> GetTasks()
        {
            return Ok(_taskRepository.GetTasks());
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}")]
        public ActionResult<Task> GetTask(int id)
        {
            var task = _taskRepository.GetTaskById(id);
            if (task == null)
            {
                return NotFound();// מחזיר שגיאת 404 אם המשימה לא נמצאה
            }
            return Ok(task);
        }

        // POST api/<TasksController>
        [HttpPost]
        public ActionResult AddTask([FromBody] TodoTask todoTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // מחזיר שגיאת 400 עם הודעות האימות
            }
            _taskRepository.AddTask(todoTask);
            return CreatedAtAction(nameof(GetTask), new { id = todoTask.Id }, todoTask);
        }

        // PUT api/<TasksController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TodoTask todoTask)
        {
            if (id != todoTask.Id)
            {
                return BadRequest();
            }
            _taskRepository.UpdateTask(todoTask);
            return NoContent();
        }

        // DELETE api/<TasksController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            _taskRepository.DeleteTask(id);
            return NoContent();
        }
    }
}
