import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Book } from '../Interfaces/model/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://openlibrary.org/search.json?q=books&limit=6';

  constructor(private http: HttpClient) { }

  // Método para obtener los libros desde la API OPEN LIBRARY
  getBooks(page: number): Observable<Book[]> {
    const url = `${this.apiUrl}&page=${page}`;
    return this.http.get<any>(url).pipe(
      map(data => {
        return data.docs.map((book: any) => ({
          id: book.key,
          portada: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : '',
          titulo: book.title,
          autor: book.author_name ? book.author_name.join(', ') : 'Desconocido',
          categoria: book.subject ? book.subject.join(', ') : 'Sin categoría',
          anio_publicacion: book.first_publish_year || 'Desconocido'
        }));
      })
    );
  }
}
