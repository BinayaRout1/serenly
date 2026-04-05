export function getDicebearAvatar(seed) {
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;
}

export function isLegacyAvatarUrl(url = "") {
  return url.includes("avatar.iran.liara.run");
}

export function shouldRefreshAvatar(url = "") {
  return !url || isLegacyAvatarUrl(url);
}

export async function ensureUserAvatar(user) {
  if (!user || !shouldRefreshAvatar(user.profilePic)) return user;

  const seed = user._id?.toString?.() || user.id?.toString?.() || user.email || user.fullName || "user";
  user.profilePic = getDicebearAvatar(seed);

  if (typeof user.save === "function") {
    await user.save();
  }

  return user;
}
