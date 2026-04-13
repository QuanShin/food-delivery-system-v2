import 'package:flutter/material.dart';
import 'models/menu_item_model.dart';
import 'models/profile_model.dart';
import 'services/menu_service.dart';
import 'services/auth_service.dart';
import 'services/session_service.dart';
import 'services/cart_service.dart';

void main() {
  runApp(const FoodDeliveryMobileApp());
}

class FoodDeliveryMobileApp extends StatelessWidget {
  const FoodDeliveryMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food Delivery Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F1117),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6F4BFF),
          brightness: Brightness.dark,
        ),
        cardColor: const Color(0xFF171B22),
        useMaterial3: true,
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int currentIndex = 0;

  final List<Widget> pages = const [
    MobileHomePage(),
    MobileCatalogPage(),
    MobileCartPage(),
    MobileTrackingPage(),
    MobileProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.restaurant_menu), label: 'Catalog'),
          NavigationDestination(icon: Icon(Icons.shopping_cart_outlined), label: 'Cart'),
          NavigationDestination(icon: Icon(Icons.local_shipping_outlined), label: 'Tracking'),
          NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profile'),
        ],
      ),
    );
  }
}

class MobileHomePage extends StatelessWidget {
  const MobileHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final categories = ['Burgers', 'Pizza', 'Asian', 'Italian', 'Desserts'];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Food Delivery'),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: const LinearGradient(
                colors: [Color(0xFFFF7A18), Color(0xFFFF4D4F)],
              ),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Fast delivery for your favorite meals',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 10),
                Text(
                  'Browse menu items, add to cart, and track orders in real time.',
                  style: TextStyle(fontSize: 15),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Popular Categories',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: categories
                .map(
                  (category) => Chip(
                    label: Text(category),
                    backgroundColor: const Color(0xFF171B22),
                  ),
                )
                .toList(),
          ),
          const SizedBox(height: 24),
          const Text(
            'Featured Dishes',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          const DishPreviewCard(
            name: 'Spaghetti & Meatballs',
            subtitle: 'Italian • \$17.95',
            icon: Icons.dinner_dining,
          ),
          const DishPreviewCard(
            name: 'Chicken Burger',
            subtitle: 'American • \$12.95',
            icon: Icons.lunch_dining,
          ),
          const DishPreviewCard(
            name: 'Pork Ramen',
            subtitle: 'Asian • \$17.95',
            icon: Icons.ramen_dining,
          ),
        ],
      ),
    );
  }
}

class DishPreviewCard extends StatelessWidget {
  final String name;
  final String subtitle;
  final IconData icon;

  const DishPreviewCard({
    super.key,
    required this.name,
    required this.subtitle,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: const Color(0xFF6F4BFF),
          child: Icon(icon, color: Colors.white),
        ),
        title: Text(name),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
      ),
    );
  }
}

class MobileCatalogPage extends StatefulWidget {
  const MobileCatalogPage({super.key});

  @override
  State<MobileCatalogPage> createState() => _MobileCatalogPageState();
}

class _MobileCatalogPageState extends State<MobileCatalogPage> {
  late Future<List<MenuItemModel>> futureMenuItems;

  @override
  void initState() {
    super.initState();
    futureMenuItems = MenuService.getMenuItems();
  }

  IconData getCategoryIcon(String category) {
    switch (category.toLowerCase()) {
      case 'american':
        return Icons.lunch_dining;
      case 'asian':
        return Icons.ramen_dining;
      case 'mexican':
        return Icons.local_fire_department;
      case 'italian':
        return Icons.dinner_dining;
      default:
        return Icons.fastfood;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Food Catalog')),
      body: FutureBuilder<List<MenuItemModel>>(
        future: futureMenuItems,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  'Failed to load menu items.\n${snapshot.error}',
                  textAlign: TextAlign.center,
                ),
              ),
            );
          }

          final items = snapshot.data ?? [];

          if (items.isEmpty) {
            return const Center(child: Text('No menu items found.'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];

              return Card(
                margin: const EdgeInsets.only(bottom: 14),
                child: ListTile(
                  contentPadding: const EdgeInsets.all(14),
                  leading: CircleAvatar(
                    radius: 26,
                    backgroundColor: const Color(0xFF2B3442),
                    child: Icon(
                      getCategoryIcon(item.category),
                      color: Colors.white,
                    ),
                  ),
                  title: Text(
                    item.name,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text('${item.category} • \$${item.price.toStringAsFixed(2)}'),
                  trailing: ElevatedButton(
                    onPressed: item.available
                        ? () {
                            CartService.instance.addItem(item);

                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('${item.name} added to cart')),
                            );
                          }
                        : null,
                    child: const Text('Add'),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class MobileCartPage extends StatefulWidget {
  const MobileCartPage({super.key});

  @override
  State<MobileCartPage> createState() => _MobileCartPageState();
}

class _MobileCartPageState extends State<MobileCartPage> {
  @override
  void initState() {
    super.initState();
    CartService.instance.addListener(_refresh);
  }

  @override
  void dispose() {
    CartService.instance.removeListener(_refresh);
    super.dispose();
  }

  void _refresh() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final cartItems = CartService.instance.items;
    final total = CartService.instance.total;

    return Scaffold(
      appBar: AppBar(title: const Text('My Cart')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: cartItems.isEmpty
            ? const Center(child: Text('Your cart is empty.'))
            : Column(
                children: [
                  Expanded(
                    child: ListView.builder(
                      itemCount: cartItems.length,
                      itemBuilder: (context, index) {
                        final item = cartItems[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          child: ListTile(
                            title: Text(item.name),
                            subtitle: Text('Qty: ${item.quantity}'),
                            trailing: Text(
                              '\$${(item.price * item.quantity).toStringAsFixed(2)}',
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: const Color(0xFF171B22),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Subtotal: \$${total.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text(
                          'Total: \$${total.toStringAsFixed(2)}',
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 14),
                        const SizedBox(
                          width: double.infinity,
                          child: FilledButton(
                            onPressed: null,
                            child: Text('Checkout (next step)'),
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              ),
      ),
    );
  }
}

class MobileTrackingPage extends StatelessWidget {
  const MobileTrackingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tracking = [
      {'order': 'Order #1', 'status': 'ON_THE_WAY'},
      {'order': 'Order #2', 'status': 'DELIVERED'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Order Tracking')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: tracking.length,
        itemBuilder: (context, index) {
          final item = tracking[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 14),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item['order']!,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                  const SizedBox(height: 8),
                  Text('Status: ${item['status']}'),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      _TrackingStep(
                        label: 'Assigned',
                        active: true,
                      ),
                      const SizedBox(width: 8),
                      _TrackingStep(
                        label: 'On the way',
                        active: item['status'] == 'ON_THE_WAY' || item['status'] == 'DELIVERED',
                      ),
                      const SizedBox(width: 8),
                      _TrackingStep(
                        label: 'Delivered',
                        active: item['status'] == 'DELIVERED',
                      ),
                    ],
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _TrackingStep extends StatelessWidget {
  final String label;
  final bool active;

  const _TrackingStep({
    required this.label,
    required this.active,
  });

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(label),
      backgroundColor: active ? const Color(0xFF6F4BFF) : const Color(0xFF2B3442),
      labelStyle: const TextStyle(color: Colors.white),
    );
  }
}

class MobileProfilePage extends StatefulWidget {
  const MobileProfilePage({super.key});

  @override
  State<MobileProfilePage> createState() => _MobileProfilePageState();
}

class _MobileProfilePageState extends State<MobileProfilePage> {
  Future<ProfileModel?> loadProfile() async {
    final token = await SessionService.getToken();

    if (token == null || token.isEmpty) {
      return null;
    }

    return AuthService.getProfile(token);
  }

  Future<void> logout() async {
    await SessionService.clearToken();

    if (!mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Logged out successfully')),
    );

    setState(() {});
  }

  Future<void> showLoginDialog() async {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();

    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Login'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: passwordController,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Password'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () async {
                try {
                  final response = await AuthService.login(
                    email: emailController.text.trim(),
                    password: passwordController.text.trim(),
                  );

                  await SessionService.saveToken(response.token);

                  if (context.mounted) {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Welcome ${response.username}')),
                    );
                  }

                  setState(() {});
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Login failed: $e')),
                    );
                  }
                }
              },
              child: const Text('Login'),
            ),
          ],
        );
      },
    );
  }

  Future<void> showRegisterDialog() async {
    final usernameController = TextEditingController();
    final emailController = TextEditingController();
    final passwordController = TextEditingController();

    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Register'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: usernameController,
                  decoration: const InputDecoration(labelText: 'Username'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(labelText: 'Password'),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () async {
                try {
                  final response = await AuthService.register(
                    username: usernameController.text.trim(),
                    email: emailController.text.trim(),
                    password: passwordController.text.trim(),
                  );

                  await SessionService.saveToken(response.token);

                  if (context.mounted) {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Registered ${response.username}')),
                    );
                  }

                  setState(() {});
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Register failed: $e')),
                    );
                  }
                }
              },
              child: const Text('Register'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: FutureBuilder<ProfileModel?>(
        future: loadProfile(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final profile = snapshot.data;

          if (profile == null) {
            return Padding(
              padding: const EdgeInsets.all(16),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Not logged in',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 12),
                      const Text('Login or register to access your account.'),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          ElevatedButton(
                            onPressed: showLoginDialog,
                            child: const Text('Login'),
                          ),
                          const SizedBox(width: 12),
                          ElevatedButton(
                            onPressed: showRegisterDialog,
                            child: const Text('Register'),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
              ),
            );
          }

          return Padding(
            padding: const EdgeInsets.all(16),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Customer Profile',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 12),
                    Text('Email: ${profile.email}'),
                    const SizedBox(height: 8),
                    Text('Authorities: ${profile.authorities.join(", ")}'),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: logout,
                      child: const Text('Logout'),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}