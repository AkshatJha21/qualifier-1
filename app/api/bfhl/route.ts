import { NextResponse } from 'next/server';
import { z } from 'zod';

const dataSchema = z.array(
  z.string().regex(/^[a-zA-Z]$|^\d+$/, "Only single alphanumeric characters are allowed")
);

export async function GET() {
  return NextResponse.json({
    operation_code: 1,
  });
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    const validData = dataSchema.safeParse(data);

    if (!validData.success) {
      return NextResponse.json({
        is_success: false,
        msg: "Invalid input",
      }, { status: 400 });
    }

    const nums = data.filter((item: string) => !isNaN(Number(item)));
    const alphas = data.filter((item: string) => isNaN(Number(item)));
    const lower = alphas.filter((item: string) => item === item.toLowerCase());
    const maxAlpha = lower.sort().slice(-1);

    return NextResponse.json({
      is_success: true,
      user_id: "akshat_jha_21102003",
      email: "akshat.jha2021@vitbhopal.ac.in",
      roll_number: "21BCE10624",
      numbers: nums,
      alphabets: alphas,
      highest_lowercase_alphabet: maxAlpha,
    });
  } catch (error) {
    return NextResponse.json({
      is_success: false,
      msg: "Something went wrong",
    }, { status: 500 });
  }
}
