import { Component } from "@angular/core";
import { empty } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  empty = [];
  empty1 = [];
  images = [];
  imagesCopy = [];
  allFiles = [];  
  show = false;
  showTyped;
  tagsReplace;
  spaceReplace;
  touched: boolean = true;
  postButton: boolean = true;
  likes;
  iconCLicked: boolean = true;
  iconUnClicked: boolean = false;
  iconChanged() {
    this.iconCLicked = false;
    this.iconUnClicked = true;
    this.likes = 1 + " Likes";   
  }
  iconUnchanged() {
    this.iconCLicked = true;
    this.iconUnClicked = false;
    this.likes = "";    
  }

  fileUpload(event) {
    // console.log(event);
    const files = event.target.files;
    // console.log(files);
    if (!!files) {
      for (let i = 0; i < files.length; i++) {
        const image = {
          name: "",
          size: "",
          type: "",
          url: ""
        };
        this.allFiles.push(files[i]);
        image.name = files[i].name;
        image.size = files[i].size;
        image.type = files[i].type;
        const reader = new FileReader();
        reader.onload = () => {
          image.url = reader.result + "";
          this.images.push(image);
          this.empty = this.images.slice();
          this.imagesCopy.push(image);
        };
        reader.readAsDataURL(files[i]);
      }
      console.log(this.imagesCopy);
    }       
    this.postButton=false; 
  }

  delete(index) {
    this.imagesCopy.splice(index, 1);
    this.allFiles.splice(index, 1);
  }

  post() {
    this.empty1 = this.empty;
    this.touched = true;
    this.showTyped = document.getElementById("para").innerHTML;
    this.tagsReplace = this.showTyped.replace(/<[^>]*>/g, "\n");
    this.spaceReplace = this.tagsReplace.replace("&nbsp", " ");
    if (this.spaceReplace == " Hey! Something Type Here ") {
      this.spaceReplace = "";
    }
    this.show = true;
    this.imagesCopy.splice(0, this.imagesCopy.length);
    document.getElementById("para").innerHTML = "Hey! Something Type Here";
    this.postButton=true;
  }

  hide() {
    this.show = false;
  }

  clear() {
    let value = document.getElementById("para").innerHTML;
    value = "";
    if (value == "" && this.touched == true) {
      document.getElementById("para").innerHTML = value;
      this.touched = false;
    }
  }

  deleteRow(index) {
    this.images.splice(index, 1);
    this.empty1.splice(index, 1);
    console.log("empty1" + this.empty1);
  }
}
