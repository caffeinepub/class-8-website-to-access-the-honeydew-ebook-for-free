import Text "mo:core/Text";
import List "mo:core/List";

actor {
  type Book = {
    title : Text;
    assetPath : Text;
  };

  let booksList = List.singleton<Book>({
    title = "Honeydew";
    assetPath = "/assets/Honeydew.pdf";
  });

  public query ({ caller }) func getBooks() : async [Book] {
    booksList.toArray();
  };
};
