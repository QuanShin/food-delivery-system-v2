class ProfileModel {
  final String email;
  final List<String> authorities;

  ProfileModel({
    required this.email,
    required this.authorities,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) {
    final rawAuthorities = json['authorities'] as List<dynamic>? ?? [];

    final authorities = rawAuthorities.map((item) {
      if (item is Map<String, dynamic>) {
        return item['authority']?.toString() ?? '';
      }
      return item.toString();
    }).toList();

    return ProfileModel(
      email: json['email'] ?? '',
      authorities: authorities,
    );
  }
}