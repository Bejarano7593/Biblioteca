import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  books: { title: string; author: string; year: number }[] = [];
  newBook = { title: '', author: '', year: 0 };
  isEditing = false;
  editingIndex: number | null = null;

  ngOnInit() {
    this.loadUserData();
    this.loadBooks();
  }

  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }

  addBook() {
    if (this.newBook.title && this.newBook.author && this.newBook.year) {
      this.books.push({ ...this.newBook });
      this.saveBooks();
      this.newBook = { title: '', author: '', year: 0 };
    } else {
      alert('Por favor, complete todos los campos del libro');
    }
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  editBook(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    this.newBook = { ...this.books[index] };
  }

  updateBook() {
    if (this.editingIndex !== null && this.newBook.title && this.newBook.author && this.newBook.year) {
      this.books[this.editingIndex] = { ...this.newBook };
      this.saveBooks();
      this.clearForm();
    } else {
      alert('Por favor, complete todos los campos del libro');
    }
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  clearForm() {
    this.newBook = { title: '', author: '', year: 0 };
    this.isEditing = false;
    this.editingIndex = null;
  }
}
