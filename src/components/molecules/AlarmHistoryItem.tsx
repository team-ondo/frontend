import React from "react";

type Props = {
  data: {
    date: string;
    time: string;
  };
};

export default function AlarmHistoryItem({ data }: Props) {
  return (
    <div style={{ marginTop: "12px", marginBottom: "12px" }}>
      <p>{`Alarm was triggered on ${data.date} at ${data.time}`}</p>
    </div>
  );
}
