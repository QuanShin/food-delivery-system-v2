class AuthResponseModel {
  final String message;
  final String username;
  final String email;
  final String role;
  final String token;

  AuthResponseModel({
    required this.message,
    required this.username,
    required this.email,
    required this.role,
    required this.token,
  });

  factory AuthResponseModel.fromJson(Map<String, dynamic> json) {
    return AuthResponseModel(
      message: json['message'] ?? '',
      username: json['username'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? '',
      token: json['token'] ?? '',
    );
  }
}