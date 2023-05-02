import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import addressModel from "../../model/address/addressModel.js";
import phlebotomistModel from "../../model/phlebotomist/phlebotomistModel.js";
import { handleFile, handleFileRemove } from "../../helper/fileUploading.js";
import bcrypt from "bcrypt";

class phlebotomistController {
  static createPhlebotomist = async (req, res) => {
    const {
      image,
      email,
      first_name,
      last_name,
      dob,
      age,
      phone,
      gender,
      address,
      area,
      id_proof,
      city,
      state,
      password,
      country,
    } = req.body;
    try {
      const imageUrl = await handleFile(image, "profile");
      const id_proofUrl = await handleFile(id_proof, "proof");
      const hashPassword = await bcrypt.hash(password, 10);
      const doc = new phlebotomistModel({
        user_id: req.user.userId,
        image: imageUrl,
        id_proof: id_proofUrl,
        email: email,
        password: hashPassword,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        age: age,
        phone: phone,
        gender: gender,
      });
      const result = await doc.save();
      const addressDoc = new addressModel({
        ref_id: result._id,
        address: address,
        area: area,
        city: city,
        state: state,
        country: country,
      });
      await addressDoc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createPhlebotomist");
    }
  };
  static getPhlebotomist = async (req, res) => {
    const { id } = req.params;
    const { user } = req.query;
    const pagination = paginationFun(req.query);

    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      if (user) {
        filter.$match = {
          ...filter.$match,
          user_id: new mongoose.Types.ObjectId(user),
        };
      }
      const result = await phlebotomistModel.aggregate([
        filter,
        {
          $lookup: {
            from: "addresses",
            localField: "_id",
            foreignField: "ref_id",
            as: "addressInfo",
          },
        },
        {
          $unwind: "$addressInfo",
        },
        {
          $group: {
            _id: "$_id",
            email: { $first: "$email" },
            first_name: { $first: "$first_name" },
            last_name: { $first: "$last_name" },
            image: { $first: "$image" },
            id_proof: { $first: "$id_proof" },
            dob: { $first: "$dob" },
            age: { $first: "$age" },
            phone: { $first: "$phone" },
            gender: { $first: "$gender" },
            address: { $first: "$addressInfo.address" },
            area: { $first: "$addressInfo.area" },
            city: { $first: "$addressInfo.city" },
            state: { $first: "$addressInfo.state" },
            country: { $first: "$addressInfo.country" },
          },
        },
        {
          $limit: pagination.limit,
        },
        {
          $skip: pagination.skip,
        },
      ]);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getPhlebotomist");
    }
  };
  static editPhlebotomist = async (req, res) => {
    const { id } = req.params;
    const {
      image,
      email,
      first_name,
      last_name,
      dob,
      age,
      phone,
      gender,
      address,
      id_proof,
      area,
      city,
      state,
      country,
    } = req.body;
    try {
      if (
        email ||
        first_name ||
        last_name ||
        dob ||
        age ||
        phone ||
        gender ||
        id_proof
      ) {
        const updatephlebotomist = {};
        if (dob) {
          updatephlebotomist.dob = dob;
        }
        if (age) {
          updatephlebotomist.age = age;
        }
        if (phone) {
          updatephlebotomist.phone = phone;
        }
        if (gender) {
          updatephlebotomist.gender = gender;
        }
        if (image) {
          updatephlebotomist.image = image;
        }
        if (first_name) {
          updatephlebotomist.first_name = first_name;
        }
        if (email) {
          updatephlebotomist.email = email;
        }
        if (last_name) {
          updatephlebotomist.last_name = last_name;
        }
        if (image) {
          const phlebotomistData = await phlebotomistModel
            .findById(id)
            .select("image");
          const imageUrl = await handleFile(image, "profile");
          handleFileRemove(phlebotomistData.image, "profile");
          updatephlebotomist.image = imageUrl;
        }
        if (id_proof) {
          const phlebotomistData = await phlebotomistModel
            .findById(id)
            .select("id_proof");
          const id_proofUrl = await handleFile(id_proof, "proof");
          handleFileRemove(phlebotomistData.image, "proof");
          updatephlebotomist.id_proof = id_proofUrl;
        }
        await phlebotomistModel.findByIdAndUpdate(
          id,
          {
            $set: updatephlebotomist,
          },
          { new: true }
        );
      }
      if (address || area || city || state || country) {
        const updateAddress = {};
        if (address) {
          updateAddress.address = address;
        }
        if (area) {
          updateAddress.area = area;
        }
        if (city) {
          updateAddress.city = city;
        }
        if (state) {
          updateAddress.state = state;
        }
        if (country) {
          updateAddress.country = country;
        }
        await addressModel.findOneAndUpdate(
          { ref_id: id },
          {
            $set: updateAddress,
          },
          { new: true }
        );
      }
      return successResponse(res, 200, "Update successfully");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editPhlebotomist");
    }
  };
  static deletePhlebotomist = async (req, res) => {
    const { id } = req.params;
    try {
      const { image, id_proof } = await phlebotomistModel.findById(id);
      handleFileRemove(image, "profile");
      handleFileRemove(id_proof, "proof");
      const result = await phlebotomistModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deletePhlebotomist");
    }
  };
}
export default phlebotomistController;
