// Browser notification utilities
export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = "default";

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  constructor() {
    if (typeof window !== "undefined" && "Notification" in window) {
      this.permission = Notification.permission;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.warn("Browser does not support notifications");
      return "denied";
    }

    if (this.permission === "granted") {
      return "granted";
    }

    if (this.permission !== "denied") {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    }

    return this.permission;
  }

  async showNotification(
    title: string,
    options?: NotificationOptions,
  ): Promise<boolean> {
    const permission = await this.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission not granted");
      return false;
    }

    try {
      const notification = new Notification(title, {
        icon: "/img/icon-192.png",
        badge: "/img/icon-192.png",
        ...options,
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return true;
    } catch (error) {
      console.error("Error showing notification:", error);
      return false;
    }
  }

  async showAnnouncementNotification(announcement: {
    title: string;
    content: string;
    category: string;
  }): Promise<boolean> {
    const categoryEmoji = {
      urgent: "🚨",
      event: "📅",
      info: "ℹ️",
    };

    return this.showNotification(
      `${categoryEmoji[announcement.category as keyof typeof categoryEmoji] || "ℹ️"} ${announcement.title}`,
      {
        body: announcement.content,
        tag: "masjid-announcement",
        requireInteraction: announcement.category === "urgent",
      },
    );
  }

  async showKajianNotification(kajian: {
    title: string;
    speaker: string;
    datetime: string;
    location: string;
  }): Promise<boolean> {
    return this.showNotification(`📚 Kajian: ${kajian.title}`, {
      body: `Pemateri: ${kajian.speaker}\nWaktu: ${kajian.datetime}\nTempat: ${kajian.location}`,
      tag: "masjid-kajian",
      requireInteraction: true,
    });
  }

  isSupported(): boolean {
    return typeof window !== "undefined" && "Notification" in window;
  }

  getPermissionStatus(): NotificationPermission {
    return this.permission;
  }
}

export const notificationService = NotificationService.getInstance();
