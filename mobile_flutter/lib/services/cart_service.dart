import 'package:flutter/foundation.dart';
import '../models/cart_item_model.dart';
import '../models/menu_item_model.dart';

class CartService extends ChangeNotifier {
  static final CartService instance = CartService._internal();

  factory CartService() => instance;

  CartService._internal();

  final List<CartItemModel> _items = [];

  List<CartItemModel> get items => List.unmodifiable(_items);

  void addItem(MenuItemModel item) {
    final existingIndex = _items.indexWhere((cartItem) => cartItem.id == item.id);

    if (existingIndex >= 0) {
      _items[existingIndex].quantity += 1;
    } else {
      _items.add(
        CartItemModel(
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        ),
      );
    }

    notifyListeners();
  }

  double get total {
    return _items.fold(0, (sum, item) => sum + (item.price * item.quantity));
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}