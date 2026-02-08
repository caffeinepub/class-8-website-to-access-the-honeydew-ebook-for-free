/**
 * Honeydew Chapter Index
 * 
 * This file contains the table of contents for the Honeydew textbook.
 * Each chapter includes a title and the page number where it begins in the PDF.
 * 
 * To update:
 * - Edit the 'title' field to change chapter names
 * - Edit the 'page' field to update the starting page number
 * - Add or remove chapters as needed
 */

export interface Chapter {
  title: string;
  page: number;
}

export const HONEYDEW_CHAPTERS: Chapter[] = [
  { title: "The Best Christmas Present in the World", page: 1 },
  { title: "The Ant and the Cricket", page: 9 },
  { title: "The Tsunami", page: 11 },
  { title: "Geography Lesson", page: 21 },
  { title: "Glimpses of the Past", page: 23 },
  { title: "Macavity: The Mystery Cat", page: 37 },
  { title: "Bepin Choudhury's Lapse of Memory", page: 39 },
  { title: "The Last Bargain", page: 51 },
  { title: "The Summit Within", page: 53 },
  { title: "The School Boy", page: 63 },
  { title: "This is Jody's Fawn", page: 65 },
  { title: "A Visit to Cambridge", page: 75 },
  { title: "A Short Monsoon Diary", page: 83 },
  { title: "The Great Stone Face—I", page: 89 },
  { title: "The Great Stone Face—II", page: 101 },
];
