import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service'
import { ParentCategory } from './parent.category.model'

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
    imports: [ReactiveFormsModule]
})
export class CategoryComponent implements OnInit {
    _newParentCategoryForm = new FormGroup({
        parent_category_name: new FormControl('', [Validators.required])
    });

    _newCategoryForm = new FormGroup({
        category_name: new FormControl('', [Validators.required]),
        id_parent: new FormControl('', [Validators.required])
    });

    _parentCategories: ParentCategory[]

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.listCategories()
    }

    listCategories() {
        this.categoryService.getList().subscribe(
            response => {
                this._parentCategories = response
                console.log("test")
            },
            error => {
                console.error("Error fetching categories")
            }
        )
    }

    onSubmitParent() {
        const formData = this._newParentCategoryForm.value
        if (formData && formData.parent_category_name) {
            this.categoryService.create_parent(formData.parent_category_name)
                .subscribe(
                    res => {
                        console.log("Parent category created.")
                        this.listCategories()
                    },
                    error => {
                        console.error("Error creating parent category")
                    }
                )
        }
    }

    onSubmit() {
        const formData = this._newCategoryForm.value
        if (formData && formData.category_name && formData.id_parent) {
            this.categoryService.create(Number(formData.id_parent), formData.category_name)
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

    okClickDeleteCategory(categoryId) {
        if (confirm("Are you sure you want to delete this category ?")) {
            this.categoryService.delete(categoryId)
                .subscribe(
                    res => {
                        console.log("Category deleted")
                        this.listCategories()
                    },
                    error => {
                        console.error("Error deleting category")
                    }
                )
        }
    }

    okClickDeleteParentCategory(parentId) {
        if (confirm("Are you sure you want to delete this parent category ?")) {
            this.categoryService.deleteParent(parentId)
                .subscribe(
                    res => {
                        console.log("Parent category deleted")
                        this.listCategories()
                    },
                    error => {
                        console.error("Error deleting parent category")
                    }
                )
        }
    }
}
