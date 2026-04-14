import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/menu_item_model.dart';
import 'api_config.dart';

class MenuService {
  static const String baseUrl = ApiConfig.menu;

  static Future<List<MenuItemModel>> getMenuItems() async {
    final response = await http.get(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final dynamic data = jsonDecode(response.body);

      if (data is List) {
        return data.map((item) => MenuItemModel.fromJson(item)).toList();
      }

      if (data is Map && data['value'] is List) {
        return (data['value'] as List)
            .map((item) => MenuItemModel.fromJson(item))
            .toList();
      }

      throw Exception('Unexpected menu response format');
    } else {
      throw Exception('Failed to load menu items: ${response.statusCode} ${response.body}');
    }
  }
}