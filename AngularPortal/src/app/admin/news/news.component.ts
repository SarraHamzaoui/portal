import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NewsService } from '../../services/news.service';
import { MatDialog } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { CreateNewsDialogComponent } from '../create-news-dialog/create-news-dialog.component';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  dataSource: any;

  constructor(private newsService: NewsService, public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.newsService.getAllActualities().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(res, 'ge')
      },
      error: (err) => {
        console.log('Erreur lors de la récupération des actualités :', err);
      }
    });
  }


  openCreateNewDialog(): void {
    const dialogRef = this.dialog.open(CreateNewsDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getData();
        }
      }
    })

  }

  openEditDialog(item: any) {
    const dialogRef = this.dialog.open(CreateNewsDialogComponent, {
      data: item, // Envoie les données actuelles de l'élément au formulaire d'édition
      width: '400px',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getData(); // Recharge les données après l'édition
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'édition :', err);
      },
    });
  }

  deleteNews(id: string): void {
    if (confirm('Are you sure you want to delete this news?')) {
      this.newsService.deleteNews(id).subscribe({
        next: (response) => {
          alert('News deleted successfully');
          this.getData(); // Recharge la liste des actualités après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('An error occurred while deleting the news.');
        },
      });
    }
  }





}
