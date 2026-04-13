class CartItemModel {
  final int id;
  final String name;
  final double price;
  int quantity;

  CartItemModel({
    required this.id,
    required this.name,
    required this.price,
    required this.quantity,
  });
}