"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyUsersGuard = void 0;
const common_1 = require("@nestjs/common");
let BodyUsersGuard = class BodyUsersGuard {
    canActivate(context) {
        const body = context.switchToHttp().getRequest().body;
        const { email, name, password, address, phone, country } = body;
        if (!email && !name && !password && !address && !phone && !country) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        return true;
    }
};
exports.BodyUsersGuard = BodyUsersGuard;
exports.BodyUsersGuard = BodyUsersGuard = __decorate([
    (0, common_1.Injectable)()
], BodyUsersGuard);
//# sourceMappingURL=users.guard.js.map