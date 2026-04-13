class MenuItemModel {
  final int id;
  final String name;
  final String category;
  final double price;
  final String description;
  final bool available;

  MenuItemModel({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.description,
    required this.available,
  });

  factory MenuItemModel.fromJson(Map<String, dynamic> json) {
    return MenuItemModel(
      id: json['id'],
      name: json['name'] ?? '',
      category: json['category'] ?? '',
      price: (json['price'] as num).toDouble(),
      description: json['description'] ?? '',
      available: json['available'] ?? false,
    );
  }
}