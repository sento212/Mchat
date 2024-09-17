import { NextRequest, NextResponse } from "next/server";
import { Conn } from "../settings/connection";

export async function GET(req, res) {
  const [rows] = await Conn().query("SELECT * FROM user_login");
  console.log(rows);
  return NextResponse.json({ test: "masuk get" });
}

export async function POST(req, res) {
  let data = await req.formData();
  let username = data.get("username");
  let password = data.get("password");
  const [rows] = await Conn().query(`
    SELECT count(1) hasil FROM user_login
    where username = '${username}' and password = '${password}'`);

  const hasil = {
    status: 200,
    message: "select data berhasil",
    data: rows,
  };
  return NextResponse.json(hasil);
}
