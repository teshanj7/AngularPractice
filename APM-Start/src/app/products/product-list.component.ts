import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    constructor(private productService: ProductService){
      
    }

    private _listFilter: string =' ';

    get listFilter() : string{
      return this._listFilter;
    }

    set listFilter(value: string){
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    toggleImage(): void{
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
    }

    performFilter(filterBy: string) : IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string) : void{
      this.pageTitle = 'Product List: ' + message;
    }


}