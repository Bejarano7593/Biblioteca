import { Component, HostListener } from '@angular/core';
import { Book } from 'src/app/Interfaces/model/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  selectedBook: Book | null = null;
  searchTerm: string = '';
  selectedCategories: string[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks(this.currentPage).subscribe((books: Book[]) => {
      this.books = [...this.books, ...books];
      this.filteredBooks = this.books;
      this.loading = false;
      this.currentPage++;
    });
  }

  // Método que se ejecuta al hacer clic en el botón de búsqueda
  onSearch(): void {
    this.filterBooks();
  }

  // Método que se ejecuta cuando un checkbox de categoría cambia
  onCategoryChange(): void {
    this.filterBooks();
  }

  // Método para manejar la adición o eliminación de categorías en selectedCategories
  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.filterBooks();
  }

  // Filtra los libros según el término de búsqueda y las categorías seleccionadas
  filterBooks(): void {
    let searchTermLower = this.searchTerm.toLowerCase();

    this.filteredBooks = this.books.filter(book => {
      // Filtrado por búsqueda
      const matchesSearch = 
        book.titulo.toLowerCase().includes(searchTermLower) ||
        book.autor.toLowerCase().includes(searchTermLower) ||
        book.anio_publicacion.toString().includes(searchTermLower);

      // Filtrado por categorías
      const matchesCategory = this.selectedCategories.length === 0 || 
        this.selectedCategories.some(category => book.categoria.toLowerCase().includes(category.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    if (position >= height - threshold && !this.loading) {
      this.loadBooks();
    }
  }

  // Método para abrir el modal con el libro seleccionado
  openBookDetail(book: Book): void {
    this.selectedBook = book;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.selectedBook = null;
  }
}
