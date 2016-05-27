using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Movies_GES.Web.Controllers
{
    public class Angular1Controller : Controller
    {
        // GET: Angular1/MovieManagement
        public ActionResult MovieManagement()
        {
            return View();
        }
        // GET: Angular1/DirectorManagement
        public ActionResult DirectorManagement()
        {
            return View();
        }
    }
}