import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service'
import { Category } from './category.model'

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
    imports: [ReactiveFormsModule, KeyValuePipe]
})
export class CategoryComponent implements OnInit {
    _newMasterCategoryForm = new FormGroup({
        master_category_name: new FormControl('', [Validators.required])
    });

    _newCategoryForm = new FormGroup({
        category_name: new FormControl('', [Validators.required]),
        id_parent: new FormControl('', [Validators.required])
    });

    _categories: Map<number, Category[]> = new Map();
    _parentCategories: { [key: number]: string } = {};

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.listCategories()
    }

    convertNumber(str: string): number {
        return Number(str)
    }

    listCategories() {
        this.categoryService.getList().subscribe(
            response => {
                const categoriesFromApi: Category[] = response
                this._categories.clear();

                categoriesFromApi.forEach((cat: Category) => {
                    this._parentCategories[cat.id_parent] = cat.parent_name
                    const idParent = cat.id_parent;
                    if (this._categories.has(idParent)) {
                        this._categories.get(idParent)!.push(cat);
                    } else {
                        this._categories.set(idParent, [cat])
                    }
                })
            },
            error => {
                console.error("Error fetching categories")
            }
        )
    }

    onSubmitMaster() {
        if (this._newMasterCategoryForm.value && this._newMasterCategoryForm.value.master_category_name) {
            this.categoryService.create_parent(this._newMasterCategoryForm.value.master_category_name)
                .subscribe(
                    res => {
                        console.log("Master category created.")
                        this.listCategories()
                    },
                    error => {
                        console.error("Error creating master category")
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
