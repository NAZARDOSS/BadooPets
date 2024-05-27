namespace BadooDog.Models
{
    public class Dog
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public List<string> ImageURL { get; set; } // Change type to List<string>
        public string Description { get; set; }
        public int Price { get; set; }
        public string Type_ { get; set; }
        public string Gender { get; set; }
    }
}