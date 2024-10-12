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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const AuthGuard_guard_1 = require("../Auth/AuthGuard.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../custom-validators/roles.decorator");
const create_user_dto_1 = require("../Users/dto/create-user.dto");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file, product_id) {
        return this.filesService.uploadFile(file, product_id);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, swagger_1.ApiTags)('files'),
    (0, common_1.Post)('uploadImage/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(create_user_dto_1.Role.Admin),
    (0, common_1.UseGuards)(AuthGuard_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: require("../products/entities/product.entity").Products }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200000,
                message: 'Max file size is 200kb',
            }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],
    }))),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map