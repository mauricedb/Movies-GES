using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Movies_GES.Web.Controllers
{
    public class MovieManagementController: Controller
    {

        public ActionResult Index()
        {
            return View();
        }
    }
}