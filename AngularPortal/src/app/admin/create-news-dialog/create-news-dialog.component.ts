
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-create-news-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './create-news-dialog.component.html',
  styleUrl: './create-news-dialog.component.scss'
})

export class CreateNewsDialogComponent implements OnInit {
  newsForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Aperçu de l'image sélectionnée
  imageFile: File | null = null; // Fichier image sélectionné

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newsService: NewsService,
    private authService: AuthService
  ) { }
  /*
    ngOnInit(): void {
      // Initialisation du formulaire
      this.newsForm = this.fb.group({
        title: [this.data?.title || '', Validators.required],
        author: [this.data?.author || this.authService.getUserIdFromToken(), Validators.required],
        description: [this.data?.description || '', Validators.required],
        image: [null],
      });
  
      if (this.data?.image) {
        this.selectedImage = this.data.image; // Prévisualisation de l'image existante si disponible
      }
  
      console.log('Token:', localStorage.getItem('token'));
  
      console.log(this.authService.getUserIdFromToken(), 'bbbbbbbbbbbbbbbb');
    }
  
  */


  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    console.log('User ID from token:', userId); // Debug

    if (!userId) {
      alert('Unable to retrieve user information. Please log in again.');
      this.dialogRef.close();
      return;
    }

    // Initialisation du formulaire avec l'ID utilisateur
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      author: [userId, Validators.required],
      description: ['', Validators.required],
    });

    if (this.data?.image) {
      this.selectedImage = this.data.image; // Prévisualisation de l'image existante si disponible
    }
  }

  // Gestion de la sélection de fichier
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file; // Stocker le fichier sélectionné
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Afficher l'aperçu de l'image
      };
      reader.readAsDataURL(file);
    }
  }


  // Soumission du formulaire
  onFormSubmit(): void {
    if (this.newsForm.valid) {
      const formData = new FormData();

      // Ajoutez les champs du formulaire à FormData
      formData.append('title', this.newsForm.get('title')?.value);
      formData.append('description', this.newsForm.get('description')?.value);
      formData.append('author', this.newsForm.get('author')?.value);

      // Ajoutez l'image si elle est sélectionnée
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      const request = this.data
        ? this.newsService.updateActuality(this.data._id, formData)
        : this.newsService.addActuality(formData);

      request.subscribe({
        next: () => {
          const action = this.data ? 'updated' : 'created';
          alert(`News ${action} successfully`);
          this.dialogRef.close(true); // Fermer le dialogue avec succès
        },
        error: (err) => {
          console.error(`Error ${this.data ? 'updating' : 'creating'} news:`, err);
          alert('An error occurred. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid');
      this.logInvalidFields();
    }
  }

  private logInvalidFields(): void {
    Object.keys(this.newsForm.controls).forEach((key) => {
      const control = this.newsForm.get(key);
      if (control?.invalid) {
        console.error(`Field "${key}" is invalid`, control.errors);
      }
    });
  }
}

/*
export class CreateNewsDialogComponent implements OnInit {
  newsForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Aperçu de l'image sélectionnée
  imageFile: File | null = null; // Fichier image sélectionné

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newsService: NewsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {


    const authorId = this.authService.getUserIdFromToken(); // Assurez-vous que l'ID de l'utilisateur est bien récupéré
    this.newsForm.patchValue({
      author: authorId // Préremplir le champ 'author' avec l'ID de l'utilisateur
    });




    // Initialisation du formulaire
    this.newsForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      author: [this.data?.author || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      image: [null],
    });

    if (this.data?.image) {
      this.selectedImage = this.data.image; // Prévisualisation de l'image existante si disponible
    }
  }

  // Gestion de la sélection de fichier
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file; // Stocker le fichier sélectionné
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Afficher l'aperçu de l'image
      };
      reader.readAsDataURL(file);
    }
  }

  // Soumission du formulaire


  onFormSubmit(): void {
    console.log('Form submitted');

    if (this.newsForm.valid) {
      console.log('Form is valid');
      const formData = new FormData();

      // Ajoutez les autres champs
      formData.append('title', this.newsForm.get('title')?.value);
      formData.append('description', this.newsForm.get('description')?.value);

      // Le champ author est déjà inclus dans le formControl
      const authorId = this.newsForm.get('author')?.value;
      console.log('Author ID:', authorId);

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      console.log('FormData contents:');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      if (this.data) {
        // Mise à jour
        this.newsService.updateActuality(this.data._id, formData).subscribe({
          next: () => {
            alert('News updated successfully');
            this.dialogRef.close(true);
          },
          error: (err) => console.error('Error updating news:', err),
        });
      } else {
        // Création
        this.newsService.addActuality(formData).subscribe({
          next: () => {
            alert('News created successfully');
            this.dialogRef.close(true);
          },
          error: (err) => console.error('Error creating news:', err),
        });
      }
    }
  }

}

*/
