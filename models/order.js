class Order {
  constructor(id, date, items, total) {
    this.id = id;
    this.date = date;
    this.items = items;
    this.total = total;
  }

  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}

export default Order;
