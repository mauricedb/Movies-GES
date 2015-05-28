using System;
using System.Collections.Generic;

namespace Movies_GES.Web.Models
{
    public class MovieProjection
    {
        public Guid Id { get; set; }
        public string Title { get; set; }


        public int? Year { get; set; }
        public int? CriticsScore { get; set; }
        public int? AudienceScore { get; set; }
        public string CriticsConsensus { get; set; }
        public string Synopsis { get; set; }
        public IList<string> AbridgedDirectors { get; set; }

        //public string MpaaRating { get; set; }



        //public IEnumerable<string> Genres { get; set; }
        //public Posters Posters { get; set; }
        //public IEnumerable<CastActor> AbridgedCast { get; set; }

    }

    public class Posters
    {
        public string Thumbnail { get; set; }
        public string Profile { get; set; }
        public string Detailed { get; set; }
        public string Original { get; set; }
    }

    public class CastActor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Characters { get; set; }
    }


    public class Director
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}