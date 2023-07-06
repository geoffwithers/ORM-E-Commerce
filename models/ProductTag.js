const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    // this page defines columbs for the product_tag table
    id: {
      type: DataTypes.INTEGER, // Sets the data type to INTEGER
      allowNull: false, // Disallows NULL values
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Automatically increments values
    },
    tag_id: {
      type: DataTypes.INTEGER, // Sets the data type to INTEGER
      references: {
        model: "tag", // References the 'tag' table
        key: "id", // References the 'id' column found in the 'tag' table
      },
    },
    product_id: {
      type: DataTypes.INTEGER, // Sets the data type to INTEGER
      references: {
        model: "product", // References the 'product' table
        key: "id", // References the 'id' column found in the 'product' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;