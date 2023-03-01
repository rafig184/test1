function Order(name, price, category, picture) {
    this.name = name;
    this.price = +price + "$";
    this.category = category;
    this.picture = picture;
}