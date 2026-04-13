import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_flutter/main.dart';

void main() {
  testWidgets('App loads main navigation screen', (WidgetTester tester) async {
    await tester.pumpWidget(const FoodDeliveryMobileApp());

    expect(find.text('Food Delivery'), findsOneWidget);
    expect(find.text('Catalog'), findsOneWidget);
    expect(find.text('Cart'), findsOneWidget);
  });
}