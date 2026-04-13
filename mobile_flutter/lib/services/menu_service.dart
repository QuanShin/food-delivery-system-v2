import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/menu_item_model.dart';

class MenuService {
  static const String baseUrl = 'http://10.0.2.2:8081/menu';

  static Future<List<MenuItemModel>> getMenuItems() async {
    final response = await http.get(Uri.parse(baseUrl));

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((item) => MenuItemModel.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load menu items');
    }
  }
}