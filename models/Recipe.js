const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require("./Ingredient");
const User = require("./User");
const recipeSchema = Schema(
  {
    name: { type: String, required: true },
    ingredients: [
      {
        name: { type: String },
        ingredientId: { type: mongoose.ObjectId, ref: Ingredient },
        qty: { type: Number },
        unit: { type: String },
      },
    ],
    descriptions: [
      {
        description: { type: String, required: true },
        image: { type: String },
      },
    ],
    categories: {
      foodCategory: { type: String }, //밑반찬, 메인반찬, 국/탕, 찌개, 디저트,면/만두, 밥/죽/떡, 퓨전, 김치/젓갈/장류, 양념/소스/잼, 양식, 샐러드, 스프, 빵, 과자, 차/음료/술, 기타
      moodCategory: { type: String }, //일상, 초스피드, 손님접대, 술안주, 다이어트, 도시락, 영양식, 간식, 야식, 푸드스타일링, 해장, 명절, 이유식, 기타
      methodCategory: { type: String }, //볶음, 끓이기, 부침, 조림, 무침, 비빔, 찜, 절임, 튀김, 삶기, 굽기, 데치기, 회, 기타
      ingredientCategory: { type: String }, //소고기, 돼지고기, 닭고기, 육류, 채소류, 해물류, 달걀/유제품, 가공식품류, 쌀, 밀가루, 건어물류, 버섯류, 과일류, 콩/견과류, 곡류, 기타
      etcCategory: { type: Array }, //위 카테고리 이외의 카테고리
    },

    images: [{ image: { type: String, required: true } }],
    userId: { type: mongoose.ObjectId, ref: User },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
recipeSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  delete obj.createAt;
  delete obj.__v;
  return obj;
};

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
