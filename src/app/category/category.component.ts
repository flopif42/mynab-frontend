import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service'
import { Category } from './category.model'

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
    imports: [ReactiveFormsModule]
})
export class CategoryComponent implements OnInit {
    _newCategoryForm = new FormGroup({
        category_name: new FormControl('', [Validators.required])
    });

    _categories = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.listCategories()
    }

    listCategories() {
        this.categoryService.getList().subscribe(
            response => {
                const categoriesFromApi: Category[] = response
                this._categories.length = 0;
                categoriesFromApi.forEach((cat: Category) => {
                    this._categories.push(cat)
                })
            },
            error => {
                console.error("Error fetching categories")
            }
        )
    }

    onSubmit() {
        if (this._newCategoryForm.value && this._newCategoryForm.value.category_name) {
            this.categoryService.create_parent(this._newCategoryForm.value.category_name)
                .subscribe(
                    res => {
                        console.log("Category created.")
                        this.listCategories()
                    },
                    error => {
                        console.error("Error creating category")
                    }
                )
        }
    }
}
