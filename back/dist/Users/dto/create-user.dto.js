"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = exports.Role = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../custom-validators/match.decorator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "Name of the user must have at least 3 characters and at most 80", example: "John Doe", minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, description: "Email of the user must be a valid email", example: "mail@example.com" }, password: { required: true, type: () => String, description: "Password of the user must have at least 8 characters, at least 1 uppercase, at least 1 lowercase, at least 1 number and at least 1 symbol", example: "Password123!" }, confirmPassword: { required: true, type: () => String, description: "Confirm password must match the password", example: "Password123!" }, address: { required: true, type: () => String, description: "Address of the user must have at least 3 characters and at most 80", example: "123 Main Street", minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number, description: "Phone of the user must be a valid phone number", example: "123456789" }, country: { required: false, type: () => String, description: "Optional Country of the user must have at least 5 characters and at most 20", example: "United States", minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, description: "Optional City of the user must have at least 5 characters and at most 20", example: "New York", minLength: 5, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
    Role["superAdmin"] = "superAdmin";
})(Role || (exports.Role = Role = {}));
class LoginUserDto extends (0, swagger_1.PickType)(CreateUserDto, [
    'email',
    'password',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=create-user.dto.js.map