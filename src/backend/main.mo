import List "mo:core/List";

actor {
  type Book = {
    title : Text;
    assetPath : Text;
    coverImagePath : Text;
  };

  let booksList = List.fromArray<Book>([
    {
      title = "Honeydew - Chapter 1: The Best Christmas Present in the World";
      assetPath = "/The_Best_Christmas_Present_in_the_World.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Poem 1: The Ant and the Cricket";
      assetPath = "/The_Ant_and_the_Cricket.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 2: The Tsunami";
      assetPath = "/The_Tsunami.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 3: Glimpses of the Past";
      assetPath = "/Glimpses_of_the_Past.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Poem 2: Geography Lesson";
      assetPath = "/Geography_Lesson.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 4: Bepin Choudhury's Lapse of Memory";
      assetPath = "/Bepin_Choudhurys_Lapse_of_Memory.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 5: The Summit Within";
      assetPath = "/The_Summit_Within.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Poem 3: Macavity: The Mystery Cat";
      assetPath = "/Macavity_The_Mystery_Cat.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 6: This is Jody's Fawn";
      assetPath = "/This_is_Jodys_Fawn.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 7: A Visit to Cambridge";
      assetPath = "/A_Visit_to_Cambridge.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Poem 4: The Last Bargain";
      assetPath = "/The_Last_Bargain.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 8: A Short Monsoon Diary";
      assetPath = "/A_Short_Monsoon_Diary.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 9: The Great Stone Face – I";
      assetPath = "/The_Great_Stone_Face_I.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
    {
      title = "Honeydew - Chapter 10: The Great Stone Face – II";
      assetPath = "/The_Great_Stone_Face_II.pdf";
      coverImagePath = "/honeydew_cover.png";
    },
  ]);

  public query ({ caller }) func getBooks() : async [Book] {
    booksList.toArray();
  };
};
