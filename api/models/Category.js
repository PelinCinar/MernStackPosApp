const mongoose = require("mongoose"); //mongooseu çağırıyoruz

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);

const Category =mongoose.model("categories",CategorySchema);//mongoose.model ile CategorySchema'yı bir MongoDB koleksiyonuna bağlıyoruz.
//"categories": MongoDB'de bu model için kullanılacak koleksiyon adı.

module.exports =Category; //Tanımladığımız Category modelini dışa aktararak diğer dosyalarda kullanılabilir hale getiriyoruz.
