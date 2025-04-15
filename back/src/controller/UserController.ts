import { UserService } from "../service/UserService";
import { Request, Response } from "express";
import { ErrorResponse } from "../errors/ErrorResponse";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import csv from "csv-parser";
import iconv from "iconv-lite";

const parseCSV = async (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const graduates: {
      matricula: string;
      nome: string;
      email: string;
      curso: string;
    }[] = [];
    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream("win1252"))
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        graduates.push({
          matricula: row.matricula.trim(),
          nome: row.nome.trim(),
          email: row.email.trim().toLowerCase(),
          curso: row.curso.trim(),
        });
      })
      .on("end", () => resolve(graduates))
      .on("error", (err) => reject(err));
  });
};

export const userController = {
  async getAllGraduates(req: Request, res: Response) {
    const { confirmed, notConfirmed, outdated, course } = req.query;

    const filters = {
      confirmed: confirmed === "true",
      notConfirmed: notConfirmed === "true",
      outdated: outdated === "true",
      course: course,
    };

    try {
      const users = await UserService.getAllGraduates(filters);
      res.json(users);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async getAllAdmins(req: Request, res: Response) {
    console.log("getallad");
    try {
      const users = await UserService.getAllAdmins();
      res.json(users);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async getAllUsers(req: Request, res: Response) {
    console.log("getalluser");
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async getUserById(req: Request, res: Response) {
    console.log("getuserbyid");
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getUserById(userId);
      res.json(user);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async getGraduateById(req: Request, res: Response) {
    console.log("getgraduate byid");
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getGraduateById(userId);
      res.json(user);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async getGraduateDetailsById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getGraduateDetailsById(userId);
      res.json(user);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async createGraduate(req: Request, res: Response) {
    try {
      const userData = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await UserService.createGraduate(userData);
      res.status(201).json({ newUser, msg: "Egresso criado." });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async createGraduateByAdmin(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await UserService.createGraduateByAdmin(userData);
      res.status(201).json({ newUser, msg: "Egresso criado." });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async createAdmin(req: Request, res: Response) {
    console.log("creatadm");
    try {
      const userData = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await UserService.createAdmin(userData);
      res.status(201).json({ newUser, msg: "Admin criado." });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async updateGraduate(req: Request, res: Response) {
    console.log("update grad");
    try {
      const userId = Number(req.params.id);
      const userData = req.body;
      const updatedUser = await UserService.updateGraduate(userId, userData);
      res.json({ updatedUser, msg: "Egresso atualizado." });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async updateAdmin(req: Request, res: Response) {
    console.log("update adminnnnn");
    try {
      const userId = Number(req.params.id);
      const userData = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const updatedUser = await UserService.updateAdmin(userId, userData);
      res.json({ updatedUser, msg: "Admin atualizado." });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async deleteGraduate(req: Request, res: Response) {
    console.log("del grad");
    try {
      const userId = Number(req.params.id);
      await UserService.deleteGraduate(userId);
      res.status(200).json({ msg: "Egresso deletado." }).end();
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async deleteAdmin(req: Request, res: Response) {
    console.log("del adm");
    try {
      const userId = Number(req.params.id);
      await UserService.deleteAdmin(userId);
      res.status(200).json({ msg: "Egresso deletado." }).end();
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async downloadGraduatesInfo(req: Request, res: Response) {
    try {
      const filter = req.query.filter;
      if (!filter) throw new Error("Escolha um dos filtros disponíveis.");
      const csv = await UserService.downloadGraduatesInfo(filter);
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=egressos.csv");
      res.status(200).send(csv);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async register(req: Request, res: Response) {
    const {
      enrollment,
      name,
      email,
      password,
      matchPassword,
      entryYear,
      graduationYear,
      courseId,
      phoneNumber,
    } = req.body;

    try {
      const user = await UserService.register(
        enrollment,
        name,
        email,
        password,
        matchPassword,
        entryYear,
        graduationYear,
        phoneNumber,
        courseId
      );

      console.log(user);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: user.id,
            name: user.name,
            email: user.email,
            allowEmails: user.allowEmails,
            role: user.role,
          },
        },
        process.env.JWT_SECRET || "SEAG@2024TTCCMR",
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        process.env.JWT_SECRET || "SEAG@2024TTCCMR",
        { expiresIn: "1d" }
      );

      user.refreshToken = refreshToken;
      await user.save({ fields: ["refreshToken"] });

      user.password = "";

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken, user: user });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async login(req: Request, res: Response) {
    console.log("login");
    const { login, password } = req.body;

    if (!login || !password)
      return res.status(400).json({ message: "Login e senha são necessários" });

    try {
      const user = await UserService.login(login, password);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: user.id,
            name: user.name,
            email: user.email,
            allowEmails: user.allowEmails,
            role: user.role,
          },
        },
        process.env.JWT_SECRET || "SEAG@2024TTCCMR",
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || "SEAG@2024TTCCMR",
        { expiresIn: "1d" }
      );

      console.log("refresh token: ", refreshToken);

      user.refreshToken = refreshToken;
      await user.update({ refreshToken });

      user.password = "";

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken, user: user });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async logout(req: Request, res: Response) {
    console.log("logout");
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await UserService.getUserByRefreshToken(refreshToken);
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.sendStatus(204);
    }

    const result = await user?.update({ refreshToken: "" });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //secure: true - only serves on https.
    res.sendStatus(204);
  },

  async refreshToken(req: Request, res: Response) {
    console.log("refresh");
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await UserService.getUserByRefreshToken(refreshToken);
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET || "SEAG@2024TTCCMR",
      (err: any, decoded: any) => {
        if (err || foundUser.email != decoded.email) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
              allowEmails: foundUser.allowEmails,
              role: foundUser.role,
            },
          },
          process.env.JWT_SECRET || "SEAG@2024TTCCMR",
          { expiresIn: "1h" }
        );
        res.json({ accessToken });
      }
    );
  },

  async getGraduatesSameCourse(req: Request, res: Response) {
    console.log("get from the same course as the current logged in graduate");
    try {
      const userId = Number(req.params.id);
      const users = await UserService.getGraduatesSameCourse(userId);
      res.json(users);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async updateUserPassword(req: Request, res: Response) {
    console.log("update user password");
    try {
      const userId = Number(req.body.userId);
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const updatedUser = await UserService.updateUserPassword(
        userId,
        oldPassword,
        newPassword
      );
      res.json({ updatedUser, msg: "Senha atualizada" });
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async confirmGraduate(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const enrollment = req.body.enrollment;
      const updatedUser = await UserService.confirmGraduate(userId, enrollment);
      res.json(updatedUser);
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async deleteMyAccount(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await UserService.getUserByRefreshToken(refreshToken);

    if (!user) {
      return res
        .status(400)
        .json("É necessário estar autenticado(a) para realizar esta ação.");
    }

    const userId = Number(req.params.id);

    if (user.id !== userId)
      return res.status(401).json("Acesso não permitido para esta ação.");

    try {
      await UserService.deleteGraduate(userId);
      res.status(200).end();
    } catch (error) {
      ErrorResponse.handleErrorResponse(error, res);
    }
  },

  async createBulkGraduatesOfSingleModality(req: any, res: Response) {
    const modalityId = Number(req.params.modalityId);

    try {
      let graduates: {
        matricula: string;
        nome: string;
        email: string;
        curso: string;
      }[] = [];

      if (req.file) {
        const filePath = req.file.path;
        graduates = await parseCSV(filePath);
        fs.unlinkSync(filePath);
      } else {
        graduates = req.body;
      }

      const creationData =
        await UserService.createBulkGraduatesOfSingleModality(
          graduates,
          modalityId
        );
      return res.json(creationData);
    } catch (err) {
      ErrorResponse.handleErrorResponse(err, res);
    }
  },
};
