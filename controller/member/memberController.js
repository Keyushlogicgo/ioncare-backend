import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import addressModel from "../../model/address/addressModel.js";
import memberModel from "../../model/member/memberModel.js";
import { handleFile, handleFileRemove } from "../../helper/fileUploading.js";

class memberController {
  static createMember = async (req, res) => {
    const {
      image,
      email,
      first_name,
      last_name,
      dob,
      age,
      phone,
      gender,
      relations,
      address,
      area,
      city,
      state,
      country,
    } = req.body;
    try {
      const imageUrl = await handleFile(image, "profile");
      const doc = new memberModel({
        user_id: req.user.userId,
        image: imageUrl,
        email: email,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        age: age,
        phone: phone,
        gender: gender,
        relations: relations,
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
      return errorResponse(res, 400, "error", error, "createMember");
    }
  };
  static getMember = async (req, res) => {
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
      const result = await memberModel.aggregate([
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
            dob: { $first: "$dob" },
            age: { $first: "$age" },
            phone: { $first: "$phone" },
            gender: { $first: "$gender" },
            relations: { $first: "$relations" },
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
      return errorResponse(res, 400, "error", error, "getMember");
    }
  };
  static editMember = async (req, res) => {
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
      relations,
      address,
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
        relations
      ) {
        const updateMember = {};
        if (dob) {
          updateMember.dob = dob;
        }
        if (age) {
          updateMember.age = age;
        }
        if (phone) {
          updateMember.phone = phone;
        }
        if (gender) {
          updateMember.gender = gender;
        }
        if (relations) {
          updateMember.relations = relations;
        }
        if (image) {
          updateMember.image = image;
        }
        if (first_name) {
          updateMember.first_name = first_name;
        }
        if (email) {
          updateMember.email = email;
        }
        if (last_name) {
          updateMember.last_name = last_name;
        }
        if (image) {
          const memberData = await memberModel.findById(id).select("image");
          const imageUrl = await handleFile(image, "profile");
          handleFileRemove(memberData.image, "profile");
          updateMember.image = imageUrl;
        }
        await memberModel.findByIdAndUpdate(
          id,
          {
            $set: updateMember,
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
      return errorResponse(res, 400, "error", error, "editMember");
    }
  };
  static deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
      const { image } = await memberModel.findById(id).select("image");
      handleFileRemove(image, "profile");
      const result = await memberModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteMember");
    }
  };
}
export default memberController;
