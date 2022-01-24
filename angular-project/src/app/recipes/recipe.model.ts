export class Recipe {
  public name: string;
  public descriotion: string;
  public imagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.descriotion = description;
    this.imagePath = imagePath;
  }
}
