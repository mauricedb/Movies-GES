using Movies_GES.Domain.Base;

namespace Movies_GES.Domain.Domain
{
    public class MovieDescribed : DomainEvent
    {
        public string Synopsis { get; private set; }
        public string CriticsConsensus { get; private set; }
        public int Year { get; private set; }

        public MovieDescribed(string synopsis, string criticsConsensus, int year)
        {
            Synopsis = synopsis;
            CriticsConsensus = criticsConsensus;
            Year = year;
        }

        public override bool Equals(object obj)
        {
            var that = obj as MovieDescribed;
            if (that != null && that.Synopsis == Synopsis && that.CriticsConsensus == CriticsConsensus && that.Year == Year)
            {
                return true;
            }
            return false;
        }
    }
}
