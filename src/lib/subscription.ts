import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { userSubscription } from "./db/schema";
import { eq } from "drizzle-orm";

const DAYS_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const _userSubscription = await db
    .select()
    .from(userSubscription)
    .where(eq(userSubscription.userId, userId));

  if (!_userSubscription[0]) {
    return false;
  }

  const userSub = _userSubscription[0];
  const stripeCurrentPeriodEndTime = userSub.stripeCurrentPeriodEnd?.getTime();

  const isValid =
    userSub.stripePriceId &&
    stripeCurrentPeriodEndTime !== undefined &&
    stripeCurrentPeriodEndTime + DAYS_IN_MS > Date.now();

  return !!isValid;
};
